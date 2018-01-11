import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MediaElementService} from './services/media-element.service';

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
  currentStream: string;
  mediaPlayer: any;
  loading: boolean;

  constructor(
    private fb: FormBuilder,
    private service: MediaElementService) {}

  ngOnInit() {
    // const source = 'http://www.bok.net/dash/tears_of_steel/cleartext/stream.mpd';
    const source = 'http://www.streambox.fr/playlists/test_001/stream.m3u8';
    // const source = 'http://localhost:8888/live-stream/stream.m3u8';

    this.newStreamFormGroup = this.fb.group({
      source: ['rtsp://admin:admin@10.51.140.154/live?channel=video.v-1&encoder=1', [Validators.required]]
    });

    this.existingStreamFormGroup = this.fb.group({
      source: ['', [Validators.required]]
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
    this.updateStream(source, false);
  }

  updateStream(src: string, autoStart = true) {
    this.mediaPlayer.setSrc(src);
    this.currentStream = src;
    this.mediaPlayer.load();

    if (!mejs.Features.isiOS && !mejs.Features.isAndroid && autoStart) {
      this.mediaPlayer.play();
    }
    this.loading = false;
  }

  onExistingStreamSubmit() {
    if (this.existingStreamFormGroup.invalid || this.loading) {
      return;
    }

    this.updateStream(this.existingStreamUrl);
  }

  onNewStreamSubmit() {
    if (this.newStreamFormGroup.invalid || this.loading) {
      return;
    }
    this.service.createStream(this.newStreamUrl)
      .subscribe(res => {
        this.loading = true;
        setTimeout(() => {
          this.updateStream(res.url);
        }, 20000);
      });
  }

  get existingStreamUrl() {
    return this.existingStreamFormGroup.get('source').value;
  }

  get newStreamUrl() {
    return this.newStreamFormGroup.get('source').value;
  }

  ngOnDestroy() {
    this.mediaPlayer.remove();
  }
}
