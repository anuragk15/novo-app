import { Extension } from "@tiptap/core";

export const SlashCommandExtension = Extension.create({
  name: "slashCommand",

  addKeyboardShortcuts() {
    return {
      "Mod-i": () => {
        alert("mod i");
        return true; // Return true to prevent default behavior
      },
      "Mod-u": () => {
        alert("mod u");
        return true; // Return true to prevent default behavior
      },
      // Listen for the slash key on a new line
      "/": ({ editor }) => {
        // //console.log(editor.isActive("paragraph"));
        if (!editor.isActive("paragraph")) {
          return false;
        }

        const { state, view } = editor;
        //  //console.log(editor);
        const { $from } = state.selection;

        // Check if the current line starts with a slash
        const lineText = $from.nodeBefore?.textContent;
        //console.log(lineText);
        if (lineText == "/") {
          const slashPos = $from.pos - 1; // Position of the first slash

          // Create a transaction to delete the first slash
          view.dispatch(
            state.tr.delete(slashPos, slashPos + 1) // Delete one character at the first slash position
          );

          // Trigger the input field display logic here
          this.options.onSlashEnter();
          return true;
        }

        return false;
      },
    };
  },
});
