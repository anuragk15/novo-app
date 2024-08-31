import { BubbleMenu, useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./Editor.css";

import UnderlineExt from "@tiptap/extension-underline";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { Markdown } from "tiptap-markdown";
import { ActionButtons } from "./EditorElements/ActionButtons";

import Heading from "@tiptap/extension-heading";
import { MenuBar } from "./EditorElements/BubbleMenu";

const mkdown = `# Discover the Beauty of Japan: A Travel Guide

Japan, a country where ancient traditions meet modern innovation, is a must-visit destination for any traveler. From its bustling cities to serene countryside, Japan offers a unique experience that caters to every kind of adventurer. In this guide, we will explore the best places to visit, the cultural nuances to be aware of, and tips to make your journey unforgettable.

## Best Places to Visit in Japan

### 1. Tokyo: The Futuristic Capital

Tokyo, Japan's capital, is a vibrant city that perfectly blends the traditional and the futuristic. Here are some must-visit places in Tokyo:

- **Shibuya Crossing**: Experience the world's busiest pedestrian crossing, a symbol of Tokyo's dynamic energy.
- **Senso-ji Temple**: The oldest temple in Tokyo, located in Asakusa, offering a glimpse into Japan's spiritual past.
- **Akihabara**: The electronic town, a paradise for tech enthusiasts and anime fans.

### 2. Kyoto: The Heart of Japan’s Culture

Kyoto is known for its well-preserved temples, gardens, and traditional tea houses. Highlights include:

- **Fushimi Inari Shrine**: Famous for its thousands of red torii gates leading up the mountain.
- **Kinkaku-ji (Golden Pavilion)**: A stunning Zen temple covered in gold leaf.
- **Arashiyama Bamboo Grove**: A peaceful and scenic bamboo forest perfect for a leisurely stroll.

### 3. Osaka: The Food Capital

Osaka is renowned for its street food and friendly locals. Don’t miss:

- **Dotonbori**: A lively district known for its street food, neon lights, and entertainment.
- **Osaka Castle**: A historic landmark offering beautiful views and a museum inside.
- **Universal Studios Japan**: A theme park featuring attractions from popular movies and TV shows.

### 4. Hiroshima: A City of Peace

Hiroshima, known for its tragic past, is now a symbol of peace and resilience.

- **Peace Memorial Park**: A poignant reminder of the atomic bombing, with museums and monuments dedicated to peace.
- **Itsukushima Shrine**: Located on Miyajima Island, famous for its "floating" torii gate.

## Experiencing Japanese Culture

Japan's culture is rich and diverse, with a few customs that travelers should be aware of:

- **Bowing**: Bowing is a common greeting in Japan. A slight bow is often sufficient for tourists.
- **Shoes**: Always remove your shoes when entering someone’s home or certain traditional accommodations like ryokan.
- **Tipping**: Tipping is not customary in Japan and can be considered rude.

## Travel Tips for Japan

- **JR Pass**: Consider purchasing a Japan Rail Pass if you plan on traveling between cities. It offers unlimited train travel on JR lines, including the Shinkansen (bullet trains).
- **Cash is King**: While credit cards are accepted in many places, Japan is still a cash-oriented society. Always carry some yen with you.
- **Language**: Learning a few basic Japanese phrases can go a long way in enhancing your travel experience.

## Conclusion

Traveling in Japan is a journey through time, from the ancient temples of Kyoto to the high-tech streets of Tokyo. With its unique culture, delicious food, and stunning landscapes, Japan is a destination that promises to leave a lasting impression. So pack your bags, respect the local customs, and get ready to discover the Land of the Rising Sun!

Happy travels!
`;

export default function EditorFn() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      UnderlineExt,
      Heading.configure({
        levels: [1, 2, 3], // Enable headings of level 1, 2, and 3
      }).extend({
        renderHTML({ node, HTMLAttributes }) {
          // Custom HTML rendering to add the floating 'h1' text
          const level = node.attrs.level;
          const classes = `heading-level heading-level-${level}`;

          return [
            `h${level}`,
            {
              ...HTMLAttributes,
              class: (HTMLAttributes.class || "") + ` ${classes}`,
            },
            0,
          ];
        },
      }),
      Color.configure({ types: [TextStyle.name] }),
      TextStyle.configure(),
      Markdown.configure({
        html: true,
        transformCopiedText: true, // Allow to copy markdown text from the editor
        transformPastedText: true, // Allow to paste markdown text in the editor
      }),
    ],
    content: mkdown,
    // content: `<p>
    //         This is an example of a Medium-like editor. Enter a new line and some ToggleGroupItems will appear.
    //       </p>
    //       <h1>Hello</h1>
    //     `,
  });

  return (
    <div className=" ">
      <EditorContent
        onSelectCapture={() => alert("seled")}
        className="rounded-lg border min-h-[80vh] "
        editor={editor}
      />

      <BubbleMenu className=" p-2 gap-2 flex" editor={editor}>
        <MenuBar editor={editor} />
      </BubbleMenu>
      <ActionButtons editor={editor} />
    </div>
  );
}
