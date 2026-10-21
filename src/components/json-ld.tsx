/** Dữ liệu có cấu trúc schema.org; thay `<` để chuỗi dữ liệu không thoát được khỏi thẻ script. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
