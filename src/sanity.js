import { createClient } from '@sanity/client'
import { toHTML } from '@portabletext/to-html'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'YOUR_PROJECT_ID',
  dataset:   import.meta.env.VITE_SANITY_DATASET   || 'production',
  useCdn:    true,
  apiVersion: '2026-02-22',
})

export async function getPosts() {
  return client.fetch(`
    *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      tags,
      category,
      "coverImage": coverImage.asset->url
    }
  `)
}

export async function getPost(slug) {
  return client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      tags,
      category,
      body,
      "coverImage": coverImage.asset->url,
      "coverAlt": coverImage.alt
    }
  `, { slug })
}

export function renderBody(body) {
  if (!body) return ''
  return toHTML(body, {
    components: {
      types: {
        image: ({ value }) => `
          <figure class="post-image">
            <img src="${value?.asset?.url ?? ''}" alt="${value?.alt ?? ''}" loading="lazy" />
            ${value?.caption ? `<figcaption>${value.caption}</figcaption>` : ''}
          </figure>
        `,
      },
    },
  })
}
