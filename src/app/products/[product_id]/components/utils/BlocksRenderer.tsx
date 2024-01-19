import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import Link from "next/link";

interface BlocksRendererCompProps {
  content: BlocksContent;
}
const BlocksRendererComp = ({ content }: BlocksRendererCompProps) => {
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        list: ({ children, format }) => {
          if (format === "unordered") {
            return <ul className="list-disc ml-5">{children}</ul>;
          }
          return <ol className="list-decimal ml-5">{children}</ol>;
        },
        heading: ({ children, level }) => {
            switch (level) {
              case 1:
                return <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl">{children}</h1>
              case 2:
                return <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">{children}</h2>
              case 3:
                return  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">{children}</h3>
              case 4:
                return <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">{children}</h4>
              case 5:
                return <h5 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">{children}</h5>
              case 6:
                return <h6 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">{children}</h6>
              default:
                return <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl">{children}</h1>
            }
          },
        link: ({ children, url }) => <Link href={url}>{children}</Link>
      }}
    />
  );
};

export default BlocksRendererComp;
