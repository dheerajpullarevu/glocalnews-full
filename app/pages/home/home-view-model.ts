import { Observable } from '@nativescript/core';
import { firebase } from '@nativescript/firebase-core';
import { firestore } from '@nativescript/firebase-firestore';
import { getArticles } from '../../services/news-service';

export class HomeViewModel extends Observable {
  private _articles: any[] = [];
  private _selectedCategory: string = 'all';
  private _selectedLanguage: string = 'English';

  constructor() {
    super();
    this.loadArticles();
  }

  get articles() {
    return this._articles;
  }

  get selectedCategory() {
    return this._selectedCategory;
  }

  get selectedLanguage() {
    return this._selectedLanguage;
  }

  async loadArticles() {
    try {
      const articles = await getArticles(this._selectedLanguage, this._selectedCategory);
      this._articles = articles;
      this.notifyPropertyChange('articles', articles);
    } catch (error) {
      console.error('Error loading articles:', error);
    }
  }

  onCategoryTap(args: any) {
    const category = args.object.text.toLowerCase();
    this._selectedCategory = category;
    this.loadArticles();
  }

  onHomeTap() {
    // Navigate to home
  }

  onTrendingTap() {
    // Navigate to trending
  }

  onVideosTap() {
    // Navigate to videos
  }

  onLiveTap() {
    // Navigate to live
  }

  onBookmarksTap() {
    // Navigate to bookmarks
  }

  onLanguageChange() {
    // Show language selection dialog
  }

  onProfileTap() {
    // Navigate to profile
  }
}