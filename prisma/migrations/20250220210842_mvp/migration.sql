-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('video', 'trailer', 'thumbnail', 'poster');

-- CreateEnum
CREATE TYPE "FileStatus" AS ENUM ('pending', 'processing', 'ready', 'failed');

-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('draft', 'published', 'archived', 'processing', 'ready', 'failed');

-- CreateEnum
CREATE TYPE "ContentRating" AS ENUM ('U', 'UA_7', 'UA_13', 'UA_16', 'A');

-- CreateEnum
CREATE TYPE "LogLavel" AS ENUM ('info', 'error', 'warning');

-- CreateEnum
CREATE TYPE "UserLikeAction" AS ENUM ('like', 'dislike', 'favorite', 'watchlist');

-- CreateEnum
CREATE TYPE "PlaylistType" AS ENUM ('mixed', 'movies_only', 'series_only');

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "external_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'user',
    "language" TEXT NOT NULL DEFAULT 'en',
    "date_of_birth" DATE,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parental_control_configs" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "parental_control" BOOLEAN NOT NULL DEFAULT false,
    "max_content_rating" "ContentRating",
    "parental_control_code" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parental_control_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "files" (
    "id" BIGSERIAL NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_key" TEXT NOT NULL,
    "file_full_url" TEXT NOT NULL,
    "status" "FileStatus" NOT NULL DEFAULT 'pending',
    "fileType" "FileType" NOT NULL,
    "mime_type" TEXT NOT NULL,
    "resolution" TEXT,
    "duration" INTEGER,
    "file_size" BIGINT NOT NULL,
    "uploaded_by_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movies" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "original_title" TEXT,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "release_date" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "published_at" TIMESTAMP(3),
    "rating" "ContentRating" NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'draft',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "metadata" JSONB,
    "featuredPlaylistsId" BIGINT,
    "movie_poster_id" BIGINT,
    "movie_backdrop_id" BIGINT,
    "movie_trailer_id" BIGINT,
    "movie_video_file_id" BIGINT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "genreId" INTEGER,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "series" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "original_title" TEXT,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "release_date" TIMESTAMP(3) NOT NULL,
    "total_seasons" INTEGER NOT NULL DEFAULT 1,
    "rating" "ContentRating" NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'draft',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "metadata" JSONB,
    "featuredPlaylistsId" BIGINT,
    "series_poster_id" BIGINT,
    "series_backdrop_id" BIGINT,
    "series_trailer_id" BIGINT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "genreId" INTEGER,

    CONSTRAINT "series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "episodes" (
    "id" SERIAL NOT NULL,
    "series_id" INTEGER NOT NULL,
    "season_number" INTEGER NOT NULL,
    "episode_number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'draft',
    "published_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "episode_poster_id" BIGINT,
    "episode_video_file_id" BIGINT,

    CONSTRAINT "episodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "movieId" INTEGER,
    "seriesId" INTEGER,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genres" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "watch_history" (
    "id" BIGSERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "movie_id" INTEGER,
    "series_id" INTEGER,
    "episode_id" INTEGER,
    "position" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "watched_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "watch_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorites" (
    "id" BIGSERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "movie_id" INTEGER,
    "series_id" INTEGER,
    "type" "UserLikeAction" NOT NULL DEFAULT 'favorite',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "watchlist" (
    "id" BIGSERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "movie_id" INTEGER,
    "series_id" INTEGER,
    "type" "UserLikeAction" NOT NULL DEFAULT 'watchlist',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "watchlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "featured_playlists" (
    "id" BIGSERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "PlaylistType" NOT NULL DEFAULT 'mixed',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "featured_playlists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logs" (
    "id" BIGSERIAL NOT NULL,
    "user_id" TEXT,
    "lavel" "LogLavel" NOT NULL DEFAULT 'info',
    "source" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_external_id_key" ON "users"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_external_id_idx" ON "users"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "parental_control_configs_user_id_key" ON "parental_control_configs"("user_id");

-- CreateIndex
CREATE INDEX "parental_control_configs_user_id_idx" ON "parental_control_configs"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "files_file_key_key" ON "files"("file_key");

-- CreateIndex
CREATE INDEX "files_file_key_uploaded_by_id_idx" ON "files"("file_key", "uploaded_by_id");

-- CreateIndex
CREATE UNIQUE INDEX "movies_slug_key" ON "movies"("slug");

-- CreateIndex
CREATE INDEX "movies_id_slug_release_date_status_rating_idx" ON "movies"("id", "slug", "release_date", "status", "rating");

-- CreateIndex
CREATE UNIQUE INDEX "series_slug_key" ON "series"("slug");

-- CreateIndex
CREATE INDEX "series_id_slug_release_date_status_rating_idx" ON "series"("id", "slug", "release_date", "status", "rating");

-- CreateIndex
CREATE INDEX "episodes_series_id_season_number_episode_number_status_idx" ON "episodes"("series_id", "season_number", "episode_number", "status");

-- CreateIndex
CREATE UNIQUE INDEX "episodes_series_id_season_number_episode_number_key" ON "episodes"("series_id", "season_number", "episode_number");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE INDEX "tags_name_idx" ON "tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "genres_name_key" ON "genres"("name");

-- CreateIndex
CREATE UNIQUE INDEX "genres_slug_key" ON "genres"("slug");

-- CreateIndex
CREATE INDEX "genres_slug_idx" ON "genres"("slug");

-- CreateIndex
CREATE INDEX "watch_history_user_id_movie_id_series_id_episode_id_idx" ON "watch_history"("user_id", "movie_id", "series_id", "episode_id");

-- CreateIndex
CREATE UNIQUE INDEX "watch_history_user_id_movie_id_series_id_episode_id_key" ON "watch_history"("user_id", "movie_id", "series_id", "episode_id");

-- CreateIndex
CREATE INDEX "favorites_user_id_movie_id_series_id_idx" ON "favorites"("user_id", "movie_id", "series_id");

-- CreateIndex
CREATE UNIQUE INDEX "favorites_user_id_movie_id_series_id_key" ON "favorites"("user_id", "movie_id", "series_id");

-- CreateIndex
CREATE INDEX "watchlist_user_id_movie_id_series_id_idx" ON "watchlist"("user_id", "movie_id", "series_id");

-- CreateIndex
CREATE UNIQUE INDEX "watchlist_user_id_movie_id_series_id_key" ON "watchlist"("user_id", "movie_id", "series_id");

-- CreateIndex
CREATE UNIQUE INDEX "featured_playlists_slug_key" ON "featured_playlists"("slug");

-- CreateIndex
CREATE INDEX "featured_playlists_type_is_active_slug_idx" ON "featured_playlists"("type", "is_active", "slug");

-- CreateIndex
CREATE INDEX "logs_user_id_idx" ON "logs"("user_id");

-- AddForeignKey
ALTER TABLE "parental_control_configs" ADD CONSTRAINT "parental_control_configs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("external_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_uploaded_by_id_fkey" FOREIGN KEY ("uploaded_by_id") REFERENCES "users"("external_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_movie_poster_id_fkey" FOREIGN KEY ("movie_poster_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_movie_backdrop_id_fkey" FOREIGN KEY ("movie_backdrop_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_movie_trailer_id_fkey" FOREIGN KEY ("movie_trailer_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_movie_video_file_id_fkey" FOREIGN KEY ("movie_video_file_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "genres"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_featuredPlaylistsId_fkey" FOREIGN KEY ("featuredPlaylistsId") REFERENCES "featured_playlists"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "series" ADD CONSTRAINT "series_series_poster_id_fkey" FOREIGN KEY ("series_poster_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "series" ADD CONSTRAINT "series_series_backdrop_id_fkey" FOREIGN KEY ("series_backdrop_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "series" ADD CONSTRAINT "series_series_trailer_id_fkey" FOREIGN KEY ("series_trailer_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "series" ADD CONSTRAINT "series_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "genres"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "series" ADD CONSTRAINT "series_featuredPlaylistsId_fkey" FOREIGN KEY ("featuredPlaylistsId") REFERENCES "featured_playlists"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_episode_poster_id_fkey" FOREIGN KEY ("episode_poster_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_episode_video_file_id_fkey" FOREIGN KEY ("episode_video_file_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "series"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watch_history" ADD CONSTRAINT "watch_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("external_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watch_history" ADD CONSTRAINT "watch_history_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watch_history" ADD CONSTRAINT "watch_history_series_id_fkey" FOREIGN KEY ("series_id") REFERENCES "series"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watch_history" ADD CONSTRAINT "watch_history_episode_id_fkey" FOREIGN KEY ("episode_id") REFERENCES "episodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("external_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_series_id_fkey" FOREIGN KEY ("series_id") REFERENCES "series"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watchlist" ADD CONSTRAINT "watchlist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("external_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watchlist" ADD CONSTRAINT "watchlist_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watchlist" ADD CONSTRAINT "watchlist_series_id_fkey" FOREIGN KEY ("series_id") REFERENCES "series"("id") ON DELETE CASCADE ON UPDATE CASCADE;
