figma.showUI(__html__);
figma.ui.resize(580, 280);

figma.ui.onmessage = (msg) => {
    if (msg.type === 'rename') {
        if (msg.name === msg.newName) {
            throw new Error('Your new name is the same as the current name.');
        }
        if (figma.currentPage.findOne((n) => n.name === msg.name) === null) {
            throw new Error('This layer was not found.');
        }
        if (msg.all === true) {
            const layers = figma.currentPage.findAll((n) => n.name === msg.name);
            layers.forEach((layers) => {
                layers.name = msg.newName;
            });
        } else {
            const layer = figma.currentPage.findOne((n) => n.name === msg.name);
            layer.name = msg.newName;
        }
    }
};
