# Changelog
## v4.0.6
- Rename `id` for schema objects to explicitly set the scope.
- Add `name` and `tags` for _playlists_.
- Add `version` to schema objects when referencing an `asset_id` to tie the presigned URL to the asset version.

## v3.3.5
- Add `id` _ZOD_ metadata for schemas.
- Normalize _ZOD_ imports to `zod` per upstream recommendation.

## v3.2.4
- Add `RecipeBaseSchema` for the _base_ recipe schema as a subset of `RecipeSchema`.  Useful for services passing _recipes_.

## v3.1.3
- Add `modify_timestamp` and `expiry_timestamp` for visual sorting.

## v3.0.2
- Add name fields for assets to aid inspection of published recipes and schedules.

## v2.0.1
- Split schema definitions to separate Schema suffix to resolve vsCode and tooling confusion.

## v1.0.0
- Initial release, derived from `publisher-schema` module.
