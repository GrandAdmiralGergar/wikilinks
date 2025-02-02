import { useEffect, useState } from "react";

function WikiWrapper({ title, navigateToFunction }) {
    const [wikiContent, setWikiContent] = useState(null);

    useEffect(() => {
        if(!title) {
            return;
        }
        pullWikiPage().then((html) => {
            console.log("use effect")
            const modifiedHtml = stripWikiHtml(html);
            setWikiContent(modifiedHtml);
        });
    }, [title]);

    useEffect(() => {
        document.querySelectorAll(".wiki-container a").forEach((a) => {
            const link = a.title;
            if(!link || link.includes(':')) {
                a.removeAttribute("href");
                a.style.color = "red"; 
            } 
            else {
                a.href = "#";
                a.onclick = (event) => { 
                    console.log("Sanity check");
                    event.preventDefault(); 
                    navigateToFunction(link);
                };    
            }
        });
        
        window.scrollTo(0, 0);
    }, [wikiContent]);
    

    const pullWikiPage = async () => {
        const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/html/${title}`);
        const html = await response.text();
        return html;
    }

    const stripSectionByHeaderId = (parsedDoc, id) => {
        const matchingElement = parsedDoc.getElementById(id);
        if(matchingElement) {
            let parent = matchingElement.closest("section") || matchingElement.parentElement;
            if(parent) {
                parent.remove();
            }
        }
    }
    const stripWarningTableByClassName = (parsedDoc, className) => {
        parsedDoc.querySelectorAll(`${className}`).forEach((table) => {
            table.remove();
        });
    }

    const stripExtraSections = (parsedDoc) => {
        stripSectionByHeaderId(parsedDoc, "References");
        stripSectionByHeaderId(parsedDoc, "External_links");        
    }

    /**
     * Entry function for all HTML manipulation operations
     * @param {String} html the retrieved html from wikipedia
     * @returns the same html modified for the game
     */
    const stripWikiHtml = (html) => {
        // TODO
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        
        stripExtraSections(doc);
        stripWarningTableByClassName(doc, ".ambox-Unreferenced");
        stripWarningTableByClassName(doc,".ambox-Refimprove");
        stripWarningTableByClassName(doc,".ambox-Copy_edit");
        return doc.body.innerHTML;
    }

    return (
        <div className="wiki-container" dangerouslySetInnerHTML={{ __html: wikiContent }}></div>
    )
}

export default WikiWrapper;