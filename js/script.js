'use strict';

class Sticker{
  constructor(text) {
    this.text = text;
    this.isEditing = false;
  }
}

Vue.directive('focus', {
  inserted(el) {
    el.focus()
  }
});

const LocalStorageKeys = {
  Stickers: "stickers",
  EnableSaving : "enable-saving"
};

let stickerBoard = new Vue({
  el: "#sticker-board-app",
  data: {
    enableSaveToLocalStorage: true,
    stickers: [new Sticker("This is my sticker #1")],
    editableSticker: null
  },
  watch: {
    enableSaveToLocalStorage(newValue){
      this.saveSettingsToLocalStorage();
    }
  },
  methods:{
    saveToLocalStorage(){
      if(this.enableSaveToLocalStorage){
        let dataRaw = this.stickers.map((sticker) => new Sticker(sticker.text));
        window.localStorage.setItem(LocalStorageKeys.Stickers, JSON.stringify(dataRaw)); 
      }
    },
    loadFromLocalStorage(){
      if(this.enableSaveToLocalStorage && window.localStorage.getItem(LocalStorageKeys.Stickers) !== null){
        this.stickers = JSON.parse(window.localStorage.getItem(LocalStorageKeys.Stickers));
      }
    },
    saveSettingsToLocalStorage(){
       window.localStorage.setItem(LocalStorageKeys.EnableSaving, JSON.stringify(this.enableSaveToLocalStorage))
    },
    loadSettingsFromLocalStorage(){
      if(window.localStorage.getItem(LocalStorageKeys.EnableSaving) !== null){
        this.enableSaveToLocalStorage = JSON.parse(window.localStorage.getItem(LocalStorageKeys.EnableSaving));
      }
    },
    removeAll(){
      if(this.editableSticker !== null && this.editableSticker.isEditing){
        this.editableSticker.isEditing = false;
      }
      this.stickers = [];
      this.saveToLocalStorage();
    },
    removeSticker(index){
      if(this.editableSticker === this.stickers[index] && this.editableSticker.isEditing){
        this.editableSticker.isEditing = false;
      }
      this.stickers.splice(index, 1);
      this.saveToLocalStorage();
    },
    addSticker(){
      this.stickers.push(new Sticker(`This is my sticker #${this.stickers.length + 1}`));
      this.startEditingSticker(this.stickers.length - 1);
      this.saveToLocalStorage();
    },
    startEditingSticker(index){
      if(this.editableSticker !== null){
        this.editableSticker.isEditing = false;
      }
      this.editableSticker = this.stickers[index];
      this.editableSticker.isEditing = true;
    },
    endEditingSticker(){
      if(this.editableSticker !== null) {
        this.editableSticker.isEditing = false;
        this.editableSticker = null;
        this.saveToLocalStorage();
      }
    }
  },
  mounted(){
    this.loadSettingsFromLocalStorage();
    this.loadFromLocalStorage();
  }
});