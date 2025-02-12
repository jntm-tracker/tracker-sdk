import type { TrackerOptions } from "@/types/tracker"

export const clickListener = (
  options: TrackerOptions,
  callback: () => void
) => {
  if (!options.enabledGlobalClickEvent) {
    return;
  }

  const invalidateElementTypes = ['HTML', 'BODY']

  const findTrackCategoryElement = (
    event: MouseEvent, attributeKey: string
  ): string => {
    let currentElement: HTMLElement | null = event.target as HTMLElement;
    const trackCategory = currentElement
      // .closest('[moli-track-name]')
      ?.getAttribute(attributeKey);
    console.log(trackCategory)
    return ''
  }

  const findTrackNameElement = (
    event: MouseEvent, attributeKey: string
  ): string => {
    let currentElement: HTMLElement | null = event.target as HTMLElement;
    const trackName = currentElement
      // .closest('[moli-track-name]')
      ?.getAttribute(attributeKey);
    console.log(trackName)
    return ''
  }


  document.addEventListener('click', (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const $elementType = target.tagName;
    if (invalidateElementTypes?.includes($elementType)) {
      return;
    }
    console.log(target)
    console.log($elementType)
    const attributeNameKey = options.attributeNameKey || '';
    const attributeCategoryKey = options.attributeCategoryKey || '';
    let trackName: string = '';
    let trackCategory: string = '';
    if (attributeNameKey) {
      trackName = findTrackNameElement(event, attributeNameKey)
    }
    if (attributeCategoryKey) {
      trackCategory = findTrackCategoryElement(event, attributeCategoryKey)
    }
    const data = {
      en: 'click',
      tagName: target.tagName,
      id: target.id,
      className: target.className,
      timestamp: Date.now(),
    };
    if (trackName && trackCategory) {
      console.log(data)
      callback();
    }
  });
};