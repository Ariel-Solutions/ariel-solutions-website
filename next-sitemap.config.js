const { createClient } = require("contentful");

const SITE_URL = "https://arielsolutions.arian.my";

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

async function fetchEntries(type) {
    try {
        const res = await client.getEntries({
            content_type: type,
        });
        return res.items || [];
    } catch (err) {
        // Contentful throws 400 for unknown content types
        if (err?.name === "unknownContentType" || err?.status === 400) {
            return [];
        }

        console.error(`Contentful error for type: ${type}`, err);
        return [];
    }
}

const getChangeFreq = (type) => {
    switch (type) {
        case "blogs":
            return "weekly";
        case "services":
            return "monthly";
        default:
            return "weekly";
    }
};

module.exports = {
    siteUrl: SITE_URL,
    generateRobotsTxt: true,

    additionalPaths: async () => {
        const paths = [];

        const [blogs, services] = await Promise.all([
            fetchEntries("blogs"),
            fetchEntries("services"),
        ]);

        blogs.forEach((item) => {
            const slug = item?.fields?.slug;
            if (slug) paths.push({
                loc: `/blogs/${slug}`,
                changefreq: getChangeFreq("blogs"),
            });
        });

        services.forEach((item) => {
            const slug = item?.fields?.slug;
            if (slug) paths.push({
                loc: `/services/${slug}`,
                changefreq: getChangeFreq("services"),});
        });

        return paths;
    },
};
