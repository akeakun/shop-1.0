'use client'
type ImageLoaderFunction = ({ src, width, quality }: { src: any; width: any; quality?: any; }) => string;
export const myImageLoader: ImageLoaderFunction = ({ src, width, quality }) => {
  return `http://localhost:1337${src}`
}