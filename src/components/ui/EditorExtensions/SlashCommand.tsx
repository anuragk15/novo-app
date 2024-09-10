import { Extension } from "@tiptap/core";

export const SlashCommandExtension = Extension.create({
  name: "slashCommand",

  addKeyboardShortcuts() {
    return {
      // Listen for the slash key on a new line
      Enter: ({ editor }) => {
        console.log(editor.isActive("paragraph"));
        if (!editor.isActive("paragraph")) {
          return false;
        }
        const { state } = editor;
        console.log(editor);
        const { $from, empty } = state.selection;
        console.log(empty);
        if (!empty) return false;

        // Check if the current line starts with a slash
        const lineText = $from.nodeBefore?.textContent;

        if (lineText == undefined) {
          // Trigger the input field display logic here
          this.options.onSlashEnter();
          return true;
        }

        return false;
      },
    };
  },
});
