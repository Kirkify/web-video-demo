import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

declare var MediaElementPlayer: any;
declare var mejs: any;

@Component({
  selector: 'command-media-element',
  templateUrl: './media-element.component.html',
  styleUrls: ['./media-element.component.scss']
})
export class MediaElementComponent implements OnInit, OnDestroy {
  @ViewChild('player1') player1;

  newStreamFormGroup: FormGroup;
  existingStreamFormGroup: FormGroup;

  aspects = [
    {value: 'auto', viewValue: 'Auto (default)'},
    {value: 'responsive', viewValue: 'Responsive'},
    {value: 'fill', viewValue: 'Fill'},
    {value: 'none', viewValue: 'None (original dimensions)'}
  ];
  selectedAspect = 'auto';

  source: string;
  currentRenderer: string;
  mediaPlayer: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // const source = 'http://www.bok.net/dash/tears_of_steel/cleartext/stream.mpd';
    const source = 'http://www.streambox.fr/playlists/test_001/stream.m3u8';
    // const source = 'http://localhost:8888/live-stream/stream.m3u8';

    this.newStreamFormGroup = this.fb.group({
      source: ['', [Validators.required]]
    });

    this.existingStreamFormGroup = this.fb.group({
      source: [source, [Validators.required]]
    });

    this.setupPlayer(source);
  }

  setupPlayer(source) {
    this.mediaPlayer = new MediaElementPlayer(this.player1.nativeElement, {
      stretching: this.selectedAspect,
      success: (media) =>  {

        media.addEventListener('loadedmetadata', () => {
          this.currentRenderer = media.rendererName;
          const src = media.originalNode.getAttribute('src').replace('&amp;', '&');
        });

        media.addEventListener('error', (e) => {
          alert(e.message);
        });
      }
    });
    this.mediaPlayer.setSrc(source);
    this.mediaPlayer.load();
  }

  onExistingStreamSubmit() {
    if (this.existingStreamFormGroup.invalid) {
      return;
    }

    this.mediaPlayer.setSrc(this.existingStreamFormGroup.get('source').value);
    this.mediaPlayer.load();

    if (!mejs.Features.isiOS && !mejs.Features.isAndroid) {
      this.mediaPlayer.play();
    }
  }

  onNewStreamSubmit() {
    if (this.newStreamFormGroup.invalid) {
      return;
    }
  }

  ngOnDestroy() {
    this.mediaPlayer.remove();
  }
}
