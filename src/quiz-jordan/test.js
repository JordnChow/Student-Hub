function formatText(input) {
    // Replace **text** with <strong>text</strong>
    input = input.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Split the input by sentences
    let sentences = input.split(/(?<=[.!?])\s+/);
    let formattedText = "";

    sentences.forEach(sentence => {
        // Handle headings indicated by ##
        if (sentence.startsWith('##')) {
            sentence = `<h3>${sentence.slice(2).trim()}</h3>`;
        }

        // Replace `*` with new lines
        if (sentence.includes('*')) {
            let parts = sentence.split('*').map(part => part.trim()).filter(part => part.length > 0);
            parts.forEach(part => {
                formattedText += `<p>${part}</p>\n`;
            });
        } else {
            formattedText += `<p>${sentence.trim()}</p>\n`;
        }
    });

    return formattedText;
}

let input = `
Australia is a major coal producer, with extraction sites spread across various states.

Here's a breakdown of the major coal extraction regions: New South Wales: * Hunter Valley: This region is Australia's largest coal-producing area, accounting for over half of the country's output.

Major mines include: * Mount Thorley Warkworth: One of the largest open-cut coal mines in the world.

* Hunter Valley Operations: A complex of several mines, including the iconic "Big Australian" mine.

* Muswellbrook: Home to several open-cut and underground mines.

* Illawarra: Located south of Sydney, this region produces metallurgical coal used in steelmaking.

* Gunnedah Basin: A large coal basin with significant reserves, primarily for thermal coal.

Queensland: * Bowen Basin: This vast region is the world's largest metallurgical coal producing area.

Major mines include: * Goonyella Riverside: One of the largest open-cut coal mines in the world.

* Peak Downs: A large open-cut coal mine.

* Blackwater: Home to several open-cut coal mines.

* Central Queensland: This region produces both thermal and metallurgical coal.

* Surat Basin: This basin contains significant reserves of both thermal and gas coal.

Other States: * Victoria: While Victoria has limited coal resources, there are some small-scale mines operating.

* Tasmania: Tasmania has some coal deposits but no commercial mining operations.

* Western Australia: Western Australia has some coal resources, but production is limited.

Specific Extraction Methods: * Open-cut mining: This method involves removing the earth above the coal seam to expose it, making it suitable for large-scale extraction.

* Underground mining: This method involves extracting coal from underground using various techniques, including longwall mining and room-and-pillar mining.

Important Note: The exact locations of coal extraction sites and their operational status are constantly changing.

For up-to-date information, you can consult resources like: * Australian Government Department of Industry, Science, Energy and Resources: https://www.industry.gov.au/ * Australian Coal Association: https://www.australiancoal.com.au/ * Mine Safety and Health Queensland: https://www.worksafe.qld.gov.au/ * NSW Resources Regulator: https://www.resourcesregulator.nsw.gov.au/

Remember that coal mining has significant environmental and social impacts, and these should be considered when evaluating the industry.
`;

let result = formatText(input);
console.log(result);
