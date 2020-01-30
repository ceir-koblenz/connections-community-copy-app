export enum WidgetDefIds {
    activities= "Activities",
    bookmarks = "Bookmarks",
    wiki = "Wiki",
    blog = "Blog",
    forum = "Forum",
    files = 'Files',
    tags = 'Tags',
    description = 'description',
    importantBookmarks = 'ImportantBookmarks',
    membersSummary = 'MembersSummary',
    statusUpdates = 'StatusUpdates',
    richContent = 'RichContent'
}

/**
 * Auflistung aller Widgets, die standardmäßig in einer neuen Community enthalten sind.
 * Diese müssen nicht explizit neu hinzugefügt werden.
 */
export const defaultWidgets: WidgetDefIds[] = [
    WidgetDefIds.files,
    WidgetDefIds.tags,
    WidgetDefIds.description,
    WidgetDefIds.forum,
    WidgetDefIds.bookmarks,
    WidgetDefIds.importantBookmarks,
    WidgetDefIds.membersSummary,
    WidgetDefIds.statusUpdates,
    WidgetDefIds.richContent
]

/**
 * Auflistung von Widgets, die Voraussetzung für die Installation bestimmter RemoteApps sind.
 * Diese sollen nicht von User explizit an- oder abgewählt werden können.
 */
export const appDependentWidgets: WidgetDefIds[] = [
    WidgetDefIds.activities,
    WidgetDefIds.blog,
    WidgetDefIds.wiki
]