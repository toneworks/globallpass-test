export class Book {
  id;
  title;
  desc;
  authorId;
  pageCount;
  langId;
  genre;

  public get data() {
    return {
      id: this.id,
      title: this.title,
      desc: this.desc,
      authorId: this.authorId,
      pageCount: this.pageCount,
      langId: this.langId,
      genre: this.genre
    };
  }

  private syncStatus = 0; // Начальное состояние

  synchronizing() {
    this.syncStatus = 1; // Данные синхронизируются с сервером
  }

  synchronized() {
    this.syncStatus = 2; // Данные успешно синхронизированы
  }

  synchFailed(){
    this.syncStatus = 3; // Ошибка при синхронизации данных
  }

  public update(title, authorId, desc, pageCount, langId, genre, id = false){
    if(id)
      this.id = id;
    this.title = title || '';
    this.authorId = authorId;
    this.desc = desc || '';
    this.pageCount = pageCount;
    this.langId = langId;
    this.genre = genre || '';
  }

  constructor(title, author, desc, pageCount, langId, genre, id) {
    this.update(title, author, desc, pageCount, langId, genre, id);
  }
}
