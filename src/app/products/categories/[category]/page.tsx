type PageTypes = {
    params: { category: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
const page = ({params}: PageTypes) => {
    
  return (
    <div>page</div>
  )
}
export default page