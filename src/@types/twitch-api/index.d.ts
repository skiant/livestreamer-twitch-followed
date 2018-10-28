export declare namespace TwitchAPI {
  interface ApiResponse<DataType> {
    data: DataType[];
  }

  type User = {
    broadcaster_type:	"partner" | "affiliate" | "",
    description: string,
    display_name:	string,
    email?:	string,
    id:	string,
    login:	string,
    offline_image_url:	string,
    profile_image_url:	string,
    type:	"staff" | "admin" | "global_mod" | "",
    view_count:	number,
  }

  type Stream = {
    community_ids:	string[],
    game_id:	string,
    id:	string,
    language:	string,
    pagination:	string,
    started_at:	string,
    thumbnail_url:	string,
    title:	string,
    type:	"live" | "",
    user_id:	string,
    user_name:	string,
    viewer_count:	number,
  }

  type Follow = {
    followed_at: string,
    from_id: string,
    from_name: string,
    to_id: string,
    to_name: string,
  }
}
