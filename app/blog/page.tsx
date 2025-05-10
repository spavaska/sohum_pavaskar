// import Link from "next/link";
// import { formatDate, getBlogPosts } from "app/lib/posts";

// export const metadata = {
//   title: "Blog",
//   description: "Nextfolio Blog",
// };

// export default function BlogPosts() {
//   let allBlogs = getBlogPosts();

//   return (
//     <section>
//       <h1 className="mb-8 text-2xl font-medium tracking-tight">Experiences</h1>
//       <div>
//         {allBlogs
//           .sort((a, b) => {
//             if (
//               new Date(a.metadata.publishedAt) >
//               new Date(b.metadata.publishedAt)
//             ) {
//               return -1;
//             }
//             return 1;
//           })
//           .map((post) => (
//             <Link
//               key={post.slug}
//               className="flex flex-col space-y-1 mb-4 transition-opacity duration-200 hover:opacity-80"
//               href={`/blog/${post.slug}`}
//             >
//               <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
//                 <p className="text-black dark:text-white tracking-tight">
//                   {post.metadata.title}
//                 </p>
//                 <p className="text-neutral-600 dark:text-neutral-400 tabular-nums text-sm">
//                   {formatDate(post.metadata.publishedAt, false)}
//                 </p>
//               </div>
//             </Link>
//           ))}
//       </div>
//     </section>
//   );
// }


import Link from "next/link";
import { formatDate, getBlogPosts } from "app/lib/posts";

export const metadata = {
  title: "Blog",
  description: "Nextfolio Blog",
};

export default function BlogPosts() {
  let allBlogs = getBlogPosts();

  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium tracking-tight">Experiences</h1>
      <div>
        {allBlogs
          .filter((post) => post.metadata.publishedAt) // Ensure `publishedAt` exists
          .sort((a, b) => {
            // Sort by start date (first date in publishedAt)
            const getStartDate = (publishedAt) => {
              if (!publishedAt) return 0;
              const [start] = publishedAt.split(" to ");
              return new Date(start.trim()).getTime();
            };
            const dateA = getStartDate(a.metadata.publishedAt);
            const dateB = getStartDate(b.metadata.publishedAt);
            // Descending order (latest first)
            return dateB - dateA;
          })
          .map((post) => (
            <Link
              key={post.slug}
              className="flex flex-col space-y-1 mb-4 transition-opacity duration-200 hover:opacity-80"
              href={`/blog/${post.slug}`}
            >
              <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                <p className="text-black dark:text-white tracking-tight">
                  {post.metadata.title}
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 tabular-nums text-sm">
                  {post.metadata.publishedAt && post.metadata.publishedAt.includes(" to ")
                    ? (() => {
                        const [start, end] = post.metadata.publishedAt.split(" to ").map((d) => d.trim());
                        const startDate = new Date(start);
                        let endStr;
                        if (end === "present" || end === "9999-12-31") {
                          endStr = "Present";
                        } else {
                          const endDate = new Date(end);
                          endStr = endDate.toLocaleString("en-us", { month: "short", year: "numeric" });
                        }
                        const startStr = startDate.toLocaleString("en-us", { month: "short", year: "numeric" });
                        return `${startStr} - ${endStr}`;
                      })()
                    : post.metadata.publishedAt
                    ? formatDate(post.metadata.publishedAt)
                    : "No Date"}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}
