import type { CmsElementType, CmsFormat } from '../cms/content';

export type CmsContentBlock = {
  id: string;
  content_key: string;
  route_path: string;
  element_type: CmsElementType;
  fallback_content: string;
  draft_content: string;
  published_content: string;
  draft_format: CmsFormat;
  published_format: CmsFormat;
  status: 'draft' | 'published';
  published_version: number;
  last_editor: string | null;
  created_at: string;
  updated_at: string;
  published_at: string;
};

export type CmsContentVersion = {
  id: number;
  content_block_id: string;
  version_number: number;
  content: string;
  format: CmsFormat;
  action: 'seed' | 'publish' | 'restore';
  created_by: string | null;
  created_at: string;
};

export type CmsAdmin = {
  user_id: string;
  display_name: string;
  role: 'owner' | 'editor';
  enabled: boolean;
};
