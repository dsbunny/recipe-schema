// vim: tabstop=8 softtabstop=0 noexpandtab shiftwidth=8 nosmarttab

import * as z from 'zod';
import { dsbunnyRegistry } from '@dsbunny/zod-registry';
import { BaseParamsSchema } from './base-params.js';

export namespace RecipeSchema {

	// #region Hash Value
	export const HashValueSchema = z.object({
		"@type": z.literal("HashValue")
			.describe("Type of the hash value"),
		method: z.literal("SHA256")
			.describe("Hash method"),
		hex: z.string()
			.describe("Hexadecimal hash value"),
	}).register(dsbunnyRegistry, {
		id: 'HashValueSchema',
		description: 'SHA-256 hash value',
	});
	// #endregion

	// #region HTML Image Element
	// Define types for HTML elements
	export const HTMLImageElementSchema = z.object({
		"@type": z.literal("HTMLImageElement")
			.describe("Type of the HTML element"),
		asset_id: z.uuid()
			.describe("DAM asset ID of the image"),
		version: z.number().min(1)
			.describe('The version number of the asset'),
		name: z.string().min(1).max(100)
			.describe('The name of the image'),
		href: z.url().min(20).max(2048)
			.describe("URL of the image"),
		expires: z.iso.datetime().optional()
			.describe("Optional expiration date of the image"),
		size: z.number().min(20).max(5368709120)  // 5GB
			.describe("Size of the image in bytes"),
		hash: HashValueSchema,
		md5: z.string().length(24)  // Base64 encoded 16 bytes.
			.describe("MD5 hash value"),
		integrity: z.string()
			.describe("Subresource Integrity (SRI) value"),
		duration: z.number().min(1).max(86400)
			.describe("Duration of the image in seconds"),
		params: BaseParamsSchema.optional()
			.describe("Optional parameters of the image element"),
	}).register(dsbunnyRegistry, {
		id: 'HTMLImageElementSchema',
		description: 'HTML image element',
	});
	export type HTMLImageElement = z.infer<typeof HTMLImageElementSchema>;
	// #endregion

	// #region HTML Video Element
	export const HTMLVideoElementSchema = z.object({
		"@type": z.literal("HTMLVideoElement")
			.describe("Type of the HTML element"),
		asset_id: z.uuid()
			.describe("DAM asset ID of the video"),
		version: z.number().min(1)
			.describe('The version number of the asset'),
		name: z.string().min(1).max(100)
			.describe('The name of the video'),
		href: z.url().min(20).max(2048)
			.describe("URL of the video"),
		expires: z.iso.datetime().optional()
			.describe("Optional expiration date of the video"),
		size: z.number().min(20).max(5497558138880) // 5TB
			.describe("Size of the video in bytes"),
		hash: HashValueSchema,
		md5: z.string().length(24)  // Base64 encoded 16 bytes.
			.describe("MD5 hash value"),
		integrity: z.string()
			.describe("Subresource Integrity (SRI) value"),
		duration: z.number().min(1).max(86400)
			.describe("Duration of the video in seconds"),
		params: BaseParamsSchema.optional()
			.describe("Optional parameters of the video element"),
	}).register(dsbunnyRegistry, {
		id: 'HTMLVideoElementSchema',
		description: 'HTML video element',
	});
	export type HTMLVideoElement = z.infer<typeof HTMLVideoElementSchema>;
	// #endregion

	// #region HTML Script Element
	export const HTMLScriptElementSchema = z.object({
		"@type": z.literal("HTMLScriptElement")
			.describe("Type of the HTML element"),
		asset_id: z.uuid()
			.describe("DAM asset ID of the script"),
		version: z.number().min(1)
			.describe('The version number of the asset'),
		name: z.string().min(1).max(100)
			.describe('The name of the script'),
		href: z.url().min(20).max(2048)
			.describe("URL of the script"),
		expires: z.iso.datetime().optional()
			.describe("Optional expiration date of the script"),
		size: z.number().min(20).max(1073741824) // 1GB
			.describe("Size of the script in bytes"),
		hash: HashValueSchema,
		md5: z.string().length(24)  // Base64 encoded 16 bytes.
			.describe("MD5 hash value"),
		integrity: z.string()
			.describe("Subresource Integrity (SRI) value"),
	}).register(dsbunnyRegistry, {
		id: 'HTMLScriptElementSchema',
		description: 'HTML script element',
	});
	export type HTMLScriptElement = z.infer<typeof HTMLScriptElementSchema>;
	// #endregion

	// #region Custom Element
	export const CustomElementSchema = z.object({
		"@type": z.literal("CustomElement")
			.describe("Type of the custom element"),
		asset_id: z.uuid()
			.describe("DAM asset ID of the custom element"),
		version: z.number().min(1)
			.describe('The version number of the asset'),
		name: z.string().min(1).max(100)
			.describe('The name of the custom element'),
		href: z.url().min(20).max(2048)
			.describe("URL of the custom element"),
		expires: z.iso.datetime().optional()
			.describe("Optional expiration date of the custom element"),
		size: z.number().min(20).max(1073741824) // 1GB
			.describe("Size of the custom element in bytes"),
		hash: HashValueSchema,
		md5: z.string().length(24)  // Base64 encoded 16 bytes.
			.describe("MD5 hash value"),
		integrity: z.string()
			.describe("Subresource Integrity (SRI) value"),
		duration: z.number().min(1).max(86400)
			.describe("Duration of the custom element in seconds"),
		params: BaseParamsSchema.optional()
			.describe("Optional parameters of the custom element"),
		sources: z.array(z.union([
			HTMLImageElementSchema.omit({ duration: true }),
			HTMLVideoElementSchema.omit({ duration: true }),
			HTMLScriptElementSchema,
		])).optional()
			.describe("Array of sources, which can be HTMLImageElement, HTMLVideoElement, or HTMLScriptElement"),
	}).register(dsbunnyRegistry, {
		id: 'CustomElementSchema',
		description: 'Custom element',
	});
	export type CustomElement = z.infer<typeof CustomElementSchema>;
	// #endregion

	// #region Recurrence Rule
	// Define types for other components
	export const RecurrenceRuleSchema = z.object({
		"@type": z.literal("RecurrenceRule")
			.describe("Type of the recurrence rule"),
		frequency: z.enum([
			"secondly",
			"minutely",
			"hourly",
			"daily",
			"weekly",
			"monthly",
			"yearly",
		])
			.describe("Frequency of the recurrence rule"),
		interval: z.number().int().min(1).max(1000).optional()
			.describe("Interval of the recurrence rule"),
		firstDayOfWeek: z.enum(["mo", "tu", "we", "th", "fr", "sa", "su"]).optional()
			.describe("First day of the week"),
		byDay: z.array(z.object({
			day: z.enum(["mo", "tu", "we", "th", "fr", "sa", "su"]),
			nthOfPeriod: z.number().int().optional(),
		})).optional()
			.describe("Array of Nth days"),
		byMonthDay: z.array(z.number().int().min(1).max(31)).optional()
			.describe("Array of month days"),
		byMonth: z.array(z.number().int().min(1).max(12)).optional()
			.describe("Array of months"),
		byYearDay: z.array(z.number().int().min(1).max(366)).optional()
			.describe("Array of year days"),
		byWeekNo: z.array(z.number().int().min(1).max(53)).optional()
			.describe("Array of week numbers"),
		byHour: z.array(z.number().int().min(0).max(23)).optional()
			.describe("Array of hours"),
		byMinute: z.array(z.number().int().min(0).max(59)).optional()
			.describe("Array of minutes"),
		bySecond: z.array(z.number().int().min(0).max(59)).optional()
			.describe("Array of seconds"),
		bySetPosition: z.array(z.number().int()).optional()
			.describe("Array of set positions"),
		timeZone: z.string().optional()
			.describe("Time zone"),
		times: z.number().int().min(1).max(1000).optional()
			.describe("Number of times the recurrence rule repeats"),
		until: z.iso.datetime().optional()
			.describe("ISO datetime until the recurrence rule repeats"),
	}).register(dsbunnyRegistry, {
		id: 'RecurrenceRuleSchema',
		description: 'Recurrence rule',
	});
	export type RecurrenceRule = z.infer<typeof RecurrenceRuleSchema>;
	// #endregion

	export const MatchPatternSchema = z.object({
		"@type": z.literal("MatchPattern")
			.describe("Type of the match pattern"),
		code: z.string()
			.describe("Code of the match pattern"),
	}).register(dsbunnyRegistry, {
		id: 'MatchPatternSchema',
		description: 'Match pattern',
	});
	export type MatchPattern = z.infer<typeof MatchPatternSchema>;

	export const DOMEventSchema = z.object({
		"@type": z.literal("DOMEvent")
			.describe("Type of the DOM event"),
		type: z.string()
			.describe("Type of the DOM event"),
		match: MatchPatternSchema,
	}).register(dsbunnyRegistry, {
		id: 'DOMEventSchema',
		description: 'DOM event',
	});
	export type DOMEvent = z.infer<typeof DOMEventSchema>;

	// #region Playlist
	export const PlaylistEntrySchema = z.union([HTMLImageElementSchema, HTMLVideoElementSchema, CustomElementSchema])
		.describe("Playlist entry, which can be HTMLImageElement, HTMLVideoElement, or CustomElement");
	export type PlaylistEntry = z.infer<typeof PlaylistEntrySchema>;

	export const PlaylistSchema = z.object({
		"@type": z.literal("Playlist")
			.describe("Type of the playlist"),
		playlist_id: z.uuid()
			.describe("ID of the playlist"),
		name: z.string().min(1).max(100)
			.describe('The name of the playlist'),
		tags: z.array(z.string().max(64))
			.describe('The tags of the playlist'),
		entries: z.array(PlaylistEntrySchema)
			.describe("Array of entries"),
	}).register(dsbunnyRegistry, {
		id: 'PlaylistSchema',
		description: 'Playlist',
	});
	export type Playlist = z.infer<typeof PlaylistSchema>;

	export const ScheduledPlaylistSchema = z.object({
		"@type": z.literal("ScheduledPlaylist")
			.describe("Type of the scheduled playlist"),
		scheduled_playlist_id: z.uuid()
			.describe("ID of the scheduled playlist"),
		priority: z.number().int().min(0).max(10)
			.describe("Priority of the scheduled playlist"),
		start: z.iso.datetime()
			.describe("ISO datetime of the start of the scheduled playlist"),
		timeZone: z.string()
			.describe("Time zone of the scheduled playlist"),
		duration: z.string()
			.describe("Duration of the scheduled playlist"),
		playlist: PlaylistSchema,
		recurrenceRules: z.array(RecurrenceRuleSchema).optional()
			.describe("Array of recurrence rules"),
		onceOn: DOMEventSchema.optional()
			.describe("Once on DOM event"),
		enableOn: DOMEventSchema.optional()
			.describe("Enable on DOM event"),
		disableOn: DOMEventSchema.optional()
			.describe("Disable on DOM event"),
	}).register(dsbunnyRegistry, {
		id: 'ScheduledPlaylistSchema',
		description: 'Scheduled playlist',
	});
	export type ScheduledPlaylist = z.infer<typeof ScheduledPlaylistSchema>;
	// #endregion

	// #region Transition
	export const TransitionSchema = z.object({
		"@type": z.literal("Transition")
			.describe("Type of the transition"),
		asset_id: z.uuid()
			.describe("DAM asset ID of the transition"),
		version: z.number().min(1)
			.describe('The version number of the asset'),
		name: z.string().min(1).max(100)
			.describe('The name of the transition'),
		href: z.url().min(20).max(2048)
			.describe("URL of the transition"),
		expires: z.iso.datetime().optional()
			.describe("Optional expiration date of the transition"),
		size: z.number().min(20).max(1073741824) // 1GB
			.describe("Size of the transition in bytes"),
		hash: HashValueSchema,
		md5: z.string().length(24)  // Base64 encoded 16 bytes.
			.describe("MD5 hash value"),
		integrity: z.string()
			.describe("Subresource Integrity (SRI) value"),
		duration: z.number().min(1).max(86400)
			.describe("Duration of the transition in seconds"),
		params: BaseParamsSchema.optional()
			.describe("Optional parameters of the transition"),
		sources: z.array(z.union([
			HTMLImageElementSchema.omit({ duration: true }),
			HTMLVideoElementSchema.omit({ duration: true }),
			HTMLScriptElementSchema,
		])).optional()
			.describe("Array of sources, which can be HTMLImageElement, HTMLVideoElement, or HTMLScriptElement"),
	}).register(dsbunnyRegistry, {
		id: 'TransitionSchema',
		description: 'Transition',
	});
	export type Transition = z.infer<typeof TransitionSchema>;
	// #endregion

	// #region Signaling Server
	export const SignalingServerSchema = z.object({
		"@type": z.literal("SignalingServer")
			.describe("Type of the signaling server"),
		url: z.url().min(20).max(2048)
			.describe("URL of the signaling server"),
	}).register(dsbunnyRegistry, {
		id: 'SignalingServerSchema',
		description: 'Signaling server',
	});
	export type SignalingServer = z.infer<typeof SignalingServerSchema>;
	// #endregion

	// #region ICE Server
	// aka RTCIceServer in the DOM.
	export const IceServerSchema = z.object({
		"@type": z.literal("IceServer")
			.describe("Type of the ICE server"),
		urls: z.union([z.string(), z.array(z.string())])
			.describe("URLs of the ICE server"),
		username: z.string().optional()
			.describe("Username of the ICE server"),
		credential: z.string().optional()
			.describe("Credential of the ICE server"),
	}).register(dsbunnyRegistry, {
		id: 'IceServerSchema',
		description: 'ICE server',
	});
	export type IceServer = z.infer<typeof IceServerSchema>;
	// #endregion

	// #region Cluster
	export const ClusterSchema = z.object({
		"@type": z.literal("Cluster")
			.describe("Type of the cluster"),
		label: z.string()
			.describe("Label of the cluster"),
		cluster_id: z.uuid()
			.describe("ID of the cluster"),
		peers: z.array(z.uuid())
			.describe("Array of peer IDs"),
		iceServers: z.array(IceServerSchema)
			.describe("Array of ICE servers"),
		signalingServers: z.array(SignalingServerSchema)
			.describe("Array of signaling servers"),
		enableLoopback: z.boolean().optional()
			.describe("Enable loopback"),
	}).register(dsbunnyRegistry, {
		id: 'ClusterSchema',
		description: 'Cluster',
	});
	export type Cluster = z.infer<typeof ClusterSchema>;
	// #endregion

	// #region Recipe Base
	export const RecipeBaseSchema = z.object({
		"@type": z.literal("RecipeBase")
			.describe("Type of the recipe base"),
		transition: TransitionSchema,
		scheduled_playlists: z.array(ScheduledPlaylistSchema)
			.describe("Array of scheduled playlists"),
		$defs: z.record(z.string(), PlaylistSchema).optional()
			.describe("Definitions of playlists"),
		cluster: ClusterSchema.optional()
			.describe("Cluster configuration"),
	}).register(dsbunnyRegistry, {
		id: 'RecipeBaseSchema',
		description: 'Shared recipe content',
	});
	export type RecipeBase = z.infer<typeof RecipeBaseSchema>;
	// #endregion

	// #region Recipe Metadata
	export const RecipeMetadataSchema = z.object({
		"@type": z.literal("RecipeMetadata")
			.describe("Type of the recipe metadata"),
		recipe_id: z.uuid()
			.describe("Recipe identifier"),
		publish_id: z.uuid()
			.describe("Publish identifier"),
		publisher_identity: z.string()
			.describe("Identity of the publishing user"),
		canvas_id: z.uuid()
			.describe("Canvas identifier"),
		viewport_id: z.string()
			.describe("Viewport identifier"),
		create_timestamp: z.iso.datetime()  // ISO 8601
			.describe('The timestamp of when the recipe was created'),
		modify_timestamp: z.iso.datetime()  // ISO 8601
			.describe('The timestamp of when the recipe was last modified'),
		expiry_timestamp: z.iso.datetime().optional()  // ISO 8601
			.describe('The timestamp of when the recipe will expire'),
	}).register(dsbunnyRegistry, {
		id: 'RecipeMetadataSchema',
		description: 'Recipe metadata',
	});
	export type RecipeMetadata = z.infer<typeof RecipeMetadataSchema>;
	// #endregion

	// Compose the final output recipe
	export const RecipeSchema = RecipeBaseSchema.extend(RecipeMetadataSchema.shape).extend({
		"@type": z.literal("Recipe")
			.describe("Type of the recipe"),
	}).register(dsbunnyRegistry, {
		id: 'RecipeSchema',
		description: 'Final composed recipe',
	});
	export type Recipe = z.infer<typeof RecipeSchema>;

	// #region Recipe Link
	// Link to a recipe
	export const RecipeLinkSchema = z.object({
		"@type": z.literal("RecipeLink")
			.describe("Type of the recipe link"),
		recipe_id: RecipeSchema.shape.recipe_id,
		ref_id: z.string().max(64).optional()
			.describe("Optional reference identifier"),
		href: z.url().min(20).max(2048)
			.describe("URL of the recipe"),
		expires: z.iso.datetime().optional()
			.describe("Optional expiration date of the recipe"),
		size: z.number().min(20).max(1073741824) // 1GB
			.describe("Size of the recipe in bytes"),
		hash: HashValueSchema,
		md5: z.string().length(24)  // Base64 encoded 16 bytes.
			.describe("MD5 hash value"),
		integrity: z.string()
			.describe("Subresource Integrity (SRI) value"),
	}).register(dsbunnyRegistry, {
		id: 'RecipeLinkSchema',
		description: 'Recipe link',
	});
	export type RecipeLink = z.infer<typeof RecipeLinkSchema>;
	// #endregion
}
