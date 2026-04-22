import { useEffect } from 'react';

export default function useSEO({ title, description, keywords }) {
    useEffect(() => {
        const originalTitle = document.title;
        const metaDescription = document.querySelector('meta[name="description"]');
        const originalDescription = metaDescription ? metaDescription.getAttribute('content') : '';

        if (title) {
            document.title = `${title} | ImageExtractor Tools`;
        }

        if (description) {
            if (metaDescription) {
                metaDescription.setAttribute('content', description);
            } else {
                const meta = document.createElement('meta');
                meta.name = 'description';
                meta.content = description;
                document.head.appendChild(meta);
            }
        }

        if (keywords) {
            let metaKeywords = document.querySelector('meta[name="keywords"]');
            if (metaKeywords) {
                metaKeywords.setAttribute('content', keywords);
            } else {
                const meta = document.createElement('meta');
                meta.name = 'keywords';
                meta.content = keywords;
                document.head.appendChild(meta);
            }
        }

        // Cleanup on unmount to revert to generic
        return () => {
            document.title = originalTitle;
            if (metaDescription) {
                metaDescription.setAttribute('content', originalDescription);
            }
        };
    }, [title, description, keywords]);
}
