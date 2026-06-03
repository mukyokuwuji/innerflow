const markdownIt = require("markdown-it");
module.exports = function(eleventyConfig) {
  eleventyConfig.setLibrary("md", markdownIt({ html: true, breaks: false, linkify: true }));
  eleventyConfig.addNunjucksFilter("displayDate", function(d, l) {
    l = l || 'en-GB';
    if (!d || !(d instanceof Date) || isNaN(d)) return "";
    try { return d.toLocaleDateString(l, { year: 'numeric', month: 'long', day: 'numeric' }); }
    catch (e) { return d.toISOString().split('T')[0]; }
  });
  eleventyConfig.addNunjucksFilter("getYear", function(d) {
    if (!d || !(d instanceof Date) || isNaN(d)) return "";
    return d.getFullYear();
  });
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("img");
  return { dir: { input: ".", includes: "_includes", output: "_site" }, markdownTemplateEngine: "njk", htmlTemplateEngine: "njk", templateFormats: ["html", "liquid", "njk", "md"] };
};
