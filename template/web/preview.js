#! usr/bin/node
/**
 * Set up a listener to rebuild on changes made in Sanity.
 * Add a token to .env.development to rebuild on all changes.
 */
const fs = require('fs')
const client = require('./utils/sanityClient')
const Eleventy = require("@11ty/eleventy");

async function preview () {
  let inst = new Eleventy();
  const eleventyProcess = async (inst) => {
    console.log('write!')
    await inst.restart()
    await inst.write();
    await inst.eleventyServe.reload()
  }
  await inst.init()
  await eleventyProcess(inst)
  inst.watch()
  inst.serve()
  client.listen('*[_type == "post"]').subscribe(async doc => {
    // If the writes happen to quickly the preview will lag
    debounce(eleventyProcess(inst), 100)
  })
}

preview()

function debounce (func, wait, immediate) {
  var timeout
  return function () {
    var context = this,
      args = arguments
    var later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}
