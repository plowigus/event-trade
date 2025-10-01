import { fetchLast4PostsData } from "../../../../lib/function";
import Image from "next/image";
import PrismEffect from "../AnimatedGradient/PrismEffect";

export default async function BlogSection() {
  const data = await fetchLast4PostsData();

  return (
    <div className="h-auto w-full bg-black text-white py-16 relative">
      <PrismEffect />
      {/* Tytuł sekcji */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-museo tracking-widest uppercase">
          NAJNOWSZE EVENTY / AKTUALNOŚCI
        </h2>
      </div>

      {/* Grid z kartami blog */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
          {data.posts.map((post) => (
            <div key={post.id} className="">
              {/* IMAGE */}
              <div className="w-full  aspect-square relative">
                {post.featuredImage.url ? (
                  <Image
                    src={post.featuredImage.url}
                    alt={post.featuredImage.alt}
                    fill
                    className="object-cover"
                  />
                ) : null}
              </div>

              {/* Treść karty */}
              <div className="py-4">
                {/* KATEGORIA */}
                <div className="mb-2">
                  {post.categories.length > 0 ? (
                    <span className="text-lg text-white font-museo uppercase tracking-wide">
                      {post.categories[0].name}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400 uppercase tracking-wide">
                      Uncategorized
                    </span>
                  )}
                </div>

                {/* NAZWA POSTA */}
                <h3 className="text-md font-bold font-museo mb-3 line-clamp-2">
                  {post.title}
                </h3>

                {/* TAGI ROZDZIELONE "/" */}
                <div className="text-sm text-white font-museo font-light">
                  {post.tags.length > 0 ? (
                    <span>{post.tags.join(" / ")}</span>
                  ) : (
                    <span>Brak tagów</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
