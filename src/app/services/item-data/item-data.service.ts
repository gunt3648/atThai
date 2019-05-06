import { LogService } from './../log/log.service';
import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subscription, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './../auth/auth.service';
import { Item, QuantityBySize } from 'src/app/interfaces/item/item';
import { Action } from 'src/app/interfaces/action/action.enum';

@Injectable({
  providedIn: 'root'
})
export class ItemDataService implements OnDestroy {

  private subscription: Subscription[] = [];

  constructor(
    private db: AngularFireDatabase,
    private auth: AuthService,
    private logService: LogService
  ) { }

  ngOnDestroy() {
    this.subscription.forEach(subscribe => {
      subscribe.unsubscribe();
    });
  }

  public async addItemToDatabase(name: string, price: number, stock: string) {
    const itemsRef = this.db.list('items-info');
    const itemInformation: Item = {
      key: null,
      name,
      price,
      stock,
      createdBy: this.auth.loggingInAccount,
      createdDate: new Date().toLocaleString(),
      size: { s: 0, m: 0, l: 0, xl: 0, xxl: 0 }
    };
    await itemsRef.push(itemInformation);
    await this.updateLastItemKey();
  }

  private get lastItemKey(): Observable<any> {
    return this.db.list<Item>('items-info',
      ref => ref.limitToLast(1)
    ).snapshotChanges();
  }

  private updateLastItemKey() {
    const itemsRef = this.db.list('items-info');
    this.subscription.push(
      this.lastItemKey.pipe(
        take(1),
        map(items => {
          itemsRef.update(items[0].key, {
            key: items[0].key
          });
          this.logService.record(Action.Create, this.auth.loggingInAccount, `Created item: ${items[0].key}`);
        })
      ).subscribe()
    );
  }

  public async updateItemInfo(key: string, itemInfo: Item | any) {
    const itemsRef = this.db.list('items-info');
    await itemsRef.update(key, itemInfo);
    await this.logService.record(Action.Update, this.auth.loggingInAccount, `Updated item: ${key}`);
  }

  public async deleteItem(key: string) {
    await this.deleteItemInfo(key);
    await this.logService.record(Action.Delete, this.auth.loggingInAccount, `Deleted item: ${key}`);
  }

  private deleteItemInfo(key: string) {
    const itemsRef = this.db.list(`items-info/${key}`);
    itemsRef.remove();
  }

  public getAllItems(): Observable<Item[]> {
    return this.db.list<Item>('items-info',
      ref => ref.orderByChild('name')
    ).valueChanges();
  }

  public getQuantityByKey(key: string) {
    return this.db.list('items-info',
      ref => ref.orderByChild('key').equalTo(key)
    ).valueChanges().pipe(
      map(items =>
        items.map((item: any) => {
          return {
            key: item.key,
            size: item.size
          };
        })
      )
    );
  }

  public checkout(key: string, amount: QuantityBySize) {
    const itemsRef = this.db.list('items-quantity');
    this.subscription.push(

    );
  }
}
