import { defineField, defineType } from 'sanity'

export const post = defineType({
  name:  'post',
  title: 'Post',
  type:  'document',

  fields: [
    defineField({
      name:       'title',
      title:      'Title',
      type:       'string',
      validation: r => r.required().max(120),
    }),

    defineField({
      name:    'slug',
      title:   'Slug',
      type:    'slug',
      options: { source: 'title', maxLength: 96 },
      validation: r => r.required(),
    }),

    defineField({
      name:  'publishedAt',
      title: 'Published At',
      type:  'datetime',
    }),

    defineField({
      name:  'category',
      title: 'Category',
      type:  'string',
      options: {
        list: [
          { title: 'Lore',         value: 'LORE'     },
          { title: 'Gaming',       value: 'GAMING'   },
          { title: 'Guides',       value: 'GUIDES'   },
          { title: 'Meta',         value: 'META'     },
          { title: 'World Design', value: 'DESIGN'   },
          { title: 'General',      value: 'GENERAL'  },
        ],
        layout: 'radio',
      },
    }),

    defineField({
      name:  'tags',
      title: 'Tags',
      type:  'array',
      of:    [{ type: 'string' }],
      options: { layout: 'tags' },
    }),

    defineField({
      name:  'excerpt',
      title: 'Excerpt',
      type:  'text',
      rows:  3,
      description: 'Short summary shown on cards and in meta tags.',
      validation: r => r.max(300),
    }),

    defineField({
      name:    'coverImage',
      title:   'Cover Image',
      type:    'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
      ],
    }),

    defineField({
      name:  'body',
      title: 'Body',
      type:  'array',
      of: [
        { type: 'block' },
        {
          type:    'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt',     title: 'Alt text', type: 'string'  }),
            defineField({ name: 'caption', title: 'Caption',  type: 'string'  }),
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title:    'title',
      subtitle: 'publishedAt',
      media:    'coverImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : 'Unpublished',
        media,
      }
    },
  },
})
