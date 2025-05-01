// eleventy.config.js for Qigong Bilingual Site

// Required libraries
const Image = require("@11ty/eleventy-img"); // For images (though not used yet)
const markdownIt = require("markdown-it"); // For Markdown rendering within Nunjucks
const nunjucks = require("nunjucks"); // Needed for SafeString if using Markdown filter later

// ==============================================================
// ASYNC Image Shortcode Function (Placeholder - Keep for future use)
// We aren't using {% image %} yet, but keep the function definition
// If you add images later, you might need the sync/async adjustments we did before.
// ==============================================================
async function imageShortcode(src, alt, sizes = "100vw") {
  // ... (You can paste the full imageShortcode function definition here if you have it)
  // ... (Or leave it out for now if no images use it yet) ...
  // For now, just a placeholder so it doesn't error if called accidentally:
  console.warn(`Image shortcode called for ${src} but not fully implemented/needed yet.`);
  return `<img src="${src}" alt="${alt || ''}">`;
}
// ==============================================================

// ==============================================================
// ELEVENTY CONFIGURATION
// ==============================================================
module.exports = function(eleventyConfig) {

    // Configure Markdown-it library
    // Still needed if you use the 'markdownify' filter approach later,
    // or if Eleventy uses it implicitly for Markdown blocks.
    const mdLib = markdownIt({
        html: true,
        breaks: false,
        linkify: true
    });
    // Set the library for Eleventy to use
    eleventyConfig.setLibrary("md", mdLib);


    // === Add Nunjucks Filters Correctly ===

    // Filter 1: Display Full Date (Handles locale)
    eleventyConfig.addNunjucksFilter("displayDate", function(dateObj, locale = 'en-GB') {
        if (!dateObj || !(dateObj instanceof Date) || isNaN(dateObj)) {
            // console.warn("Invalid date passed to displayDate filter:", dateObj);
            return ""; // Return empty string for invalid date
        }
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        try {
            return dateObj.toLocaleDateString(locale, options);
        } catch (error) {
            console.error(`Error formatting date with locale ${locale}:`, error);
            return dateObj.toISOString().split('T')[0]; // Fallback YYYY-MM-DD
        }
    });

    // Filter 2: Get Just the Year
    eleventyConfig.addNunjucksFilter("getYear", function(dateObj) {
        if (!dateObj || !(dateObj instanceof Date) || isNaN(dateObj)) {
            // console.warn("Invalid date passed to getYear filter:", dateObj);
            return ""; // Return empty string for invalid date
        }
        return dateObj.getFullYear();
    });

    // === End Filters ===


    // Add the image shortcode (async or sync, depending on previous choices)
    // Let's use the placeholder async one for now, assuming no images use it yet.
    eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);


    // Passthrough Copy configuration
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("js");
    eleventyConfig.addPassthroughCopy("img");
    // eleventyConfig.addPassthroughCopy("video"); // Uncomment if you add videos


    // Define directories and template engines
    return {
        dir: {
            input: ".",
            includes: "_includes",
            output: "_site"
        },
        // Tell Eleventy which engines to use for which file extensions.
        markdownTemplateEngine: "njk", // Process .md files with Nunjucks (useful if you add .md files later)
        htmlTemplateEngine: "njk",     // Process .html files with Nunjucks
        templateFormats: ["html", "liquid", "njk", "md"], // Recognized formats
    };
};
// ==============================================================