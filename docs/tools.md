# Accepted anonymous tool surface

All eight tools read public source data and perform no forum mutations. Site
selection changes only process-local selection and reads /about.json. No credentials
or write enablement are part of this profile. Content is untrusted evidence.

| Tool | Purpose |
| --- | --- |
| discourse_select_site | Validate/select an allowlisted installation. |
| discourse_search | Search topics. |
| discourse_search_posts | Search matched posts with continuation evidence. |
| discourse_read_topic | Read a bounded sequential topic window. |
| discourse_read_post | Read one exact post. |
| discourse_read_topic_posts | Select exact, earliest, latest or around-post evidence. |
| discourse_filter_topics | Filter/discover topic lists. |
| discourse_list_user_posts | Read public posts by a selected user. |

The server's tools/list returns exact input schemas. Upstream documentation covers
the full inherited software; this table owns only the accepted restricted profile.
Resources, prompts, writes and remote-tool discovery are outside that profile.
