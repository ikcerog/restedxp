import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool }    from '@sanity/vision'
import { schemaTypes }   from './schemas'

export default defineConfig({
  name:      'restedxp',
  title:     'RestedXP',

  // Create a project at sanity.io/manage and paste your IDs here
  // (or set SANITY_STUDIO_PROJECT_ID / SANITY_STUDIO_DATASET env vars)
  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? 'YOUR_PROJECT_ID',
  dataset:   process.env.SANITY_STUDIO_DATASET   ?? 'production',

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
