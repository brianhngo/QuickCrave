import {
  Injectable,
  TemplateRef,
  ViewContainerRef,
  ComponentRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { ItemModalComponent } from './item-card/item-modal/item-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalNotifier?: Subject<string>;
  private modalComponentRef?: ComponentRef<ItemModalComponent>;

  constructor(private viewContainerRef: ViewContainerRef) {}

  open(content: TemplateRef<any>, options?: { size?: string; title?: string }) {
    this.modalNotifier = new Subject<string>();

    // Create the component dynamically
    this.modalComponentRef =
      this.viewContainerRef.createComponent(ItemModalComponent);

    // Pass options to the component if provided
    if (options?.size) {
      this.modalComponentRef.instance.size = options.size;
    }
    if (options?.title) {
      this.modalComponentRef.instance.title = options.title;
    }

    // Subscribe to close and submit events
    this.modalComponentRef.instance.closeEvent.subscribe(() =>
      this.closeModal()
    );
    this.modalComponentRef.instance.submitEvent.subscribe(() =>
      this.submitModal()
    );

    return this.modalNotifier.asObservable();
  }

  closeModal() {
    this.modalNotifier?.complete();
    if (this.modalComponentRef) {
      this.modalComponentRef.destroy();
    }
  }

  submitModal() {
    this.modalNotifier?.next('confirm');
    this.closeModal();
  }
}
