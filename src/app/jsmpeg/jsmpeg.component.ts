import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as jsmpeg from 'jsmpeg';
import {JsmpegService} from './services/jsmpeg.service';

@Component({
  selector: 'command-jsmpeg',
  templateUrl: './jsmpeg.component.html',
  styleUrls: ['./jsmpeg.component.scss']
})
export class JsmpegComponent implements OnInit, OnDestroy {

  @ViewChild('canvas') canvas;
  @ViewChild('newStreamForm') newStreamForm;
  @ViewChild('existingStreamForm') existingStreamForm;

  private loading = false;
  private client;
  private player;

  newStreamFormGroup: FormGroup;
  existingStreamFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: JsmpegService) {}

  ngOnInit() {
    // const source = 'rtsp://184.72.239.149/vod/mp4:BigBuckBunny_115k.mov';
    const source = 'rtsp://admin:admin@10.51.140.154/live?channel=video.v-1&encoder=1';

    this.newStreamFormGroup = this.fb.group({
      source: [source, [Validators.required]]
    });

    this.existingStreamFormGroup = this.fb.group({
      source: ['', [Validators.required]]
    });
  }

  setupPlayer(port: number) {
    setTimeout(() => {
      this.client = new WebSocket(`ws://localhost:${port}`);
      this.player = new jsmpeg(this.client, {
        canvas: this.canvas.nativeElement // Canvas should be a canvas DOM element
      });
    }, 4000);
  }

  onExistingStreamSubmit() {
    if (this.existingStreamFormGroup.invalid) {
      return;
    }
  }

  onNewStreamSubmit() {
    if (this.newStreamFormGroup.invalid) {
      return;
    }
    this.service.createStream(this.newStreamFormGroup.get('source').value)
      .subscribe(res => this.setupPlayer(res.port));
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.stop();
    }
    if (this.client) {
      this.client.close();
    }
  }
}
