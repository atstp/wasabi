#!/bin/sh

# a bit patched together, but it gets the job done
#
#   1) put files on s3 (for cors)
#   2) move relevant stuff to gh-pages

tmp_dir="$(mktemp -d)"

git_root=$(git rev-parse --show-toplevel)
original_branch=$(git branch | sed -n '/^\*/s/..//p')

disseminate () {

  cd "${git_root}"

  grunt build

  # copy from master to a temp dir
  cp ./examples/*      "$tmp_dir"
  cp ./img/logo.svg    "$tmp_dir"
  cp ./img/icon.svg    "$tmp_dir"
  cp ./bin/*           "$tmp_dir"
  cp ./dist/*.{css,js} "$tmp_dir"

  magick -background none ./img/icon.svg -bordercolor transparent -border 0 \
          \( -clone 0 -resize 16x16 \) \
          \( -clone 0 -resize 32x32 \) \
          \( -clone 0 -resize 48x48 \) \
             -delete 0 -alpha on -colors 256 "${tmp_dir}/favicon.ico"

  echo "syncing to s3://wasabi.js"
  aws s3 sync "${tmp_dir}" s3://wasabi.js --delete
  echo

  # jump back over to original dir
  git checkout gh-pages >/dev/null

  # pull the assets over here
  cp "${tmp_dir}/"*.sh           ./
  cp "${tmp_dir}/"*.js           ./js/
  cp "${tmp_dir}/"*.css          ./css/
  cp "${tmp_dir}/"*.{svg,png}    ./img/
  cp "${tmp_dir}/"*.{txt,wasabi} ./examples/
  cp "${tmp_dir}/favicon.ico"    ./

  # get rid of the temp dir
  rm -r "${tmp_dir}"

  git commit -am "(automated) update assets"

  git checkout "$original_branch"
}

if [ -z "$(git status --porcelain)" ];then
  disseminate
else
  echo "Repo isn't clean, commit or stash your changes"
  git status --porcelain | sed 's/ \?[^ ]* /    /'
fi
