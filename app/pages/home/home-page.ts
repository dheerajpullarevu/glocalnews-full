import { EventData, Page } from '@nativescript/core';
import { HomeViewModel } from './home-view-model';

export function onNavigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new HomeViewModel();
}

export function onArticleTap(args: EventData) {
  const viewModel = args.object.bindingContext;
  viewModel.navigateToArticle(args.index);
}

export function onLanguageChange() {
  // Show language selection dialog
}