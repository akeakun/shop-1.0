'use client'
 
export default function myImageLoader({ src, width, quality }) {
  return `http://localhost:1337/public${src}?w=${width}&q=${quality}`
}