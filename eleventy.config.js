const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {
  const mdLib = markdownIt({ html: true, breaks: false, linkify: true });
  eleventyConfig.setLibrary("md", mdLib);

  eleventyConfig.addNunjucksFilter("displayDate", function(dateObj, locale) {
    locale = locale || 'en-GB';
    if (!dateObj || !(dateObj instanceof Date) || isNaN(dateObj)) return "";
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    try { return dateObj.toLocaleDateString(locale, options); }
    catch (e) { return dateObj.toISOString().split('T')[0]; }
  });

  eleventyConfig.addNunjucksFilter("getYear", function(dateObj) {
    if (!dateObj || !(dateObj instanceof Date) || isNaN(dateObj)) return "";
    return dateObj.getFullYear();
  });

  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("img");

  return {
    dir: { input: ".", includes: "_includes", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["html", "liquid", "njk", "md"],
  };
};
