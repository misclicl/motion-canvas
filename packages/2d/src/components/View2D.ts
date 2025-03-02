import {Rect, RectProps} from './Rect';
import {initial, signal} from '../decorators';
import {PlaybackState} from '@motion-canvas/core';
import {SimpleSignal} from '@motion-canvas/core/lib/signals';

export class View2D extends Rect {
  public static frameID = 'motion-canvas-2d-frame';
  public static shadowRoot: ShadowRoot;

  @initial(PlaybackState.Paused)
  @signal()
  public declare readonly playbackState: SimpleSignal<PlaybackState, this>;

  static {
    let frame = document.querySelector<HTMLDivElement>(`#${View2D.frameID}`);
    if (!frame) {
      frame = document.createElement('div');
      frame.id = View2D.frameID;
      frame.style.position = 'absolute';
      frame.style.pointerEvents = 'none';
      frame.style.top = '0';
      frame.style.left = '0';
      frame.style.opacity = '0';
      frame.style.overflow = 'hidden';
      document.body.prepend(frame);
    }
    View2D.shadowRoot = frame.shadowRoot ?? frame.attachShadow({mode: 'open'});
  }

  public constructor(props: RectProps) {
    super({
      composite: true,
      fontFamily: 'Roboto',
      fontSize: 48,
      lineHeight: '120%',
      textWrap: false,
      fontStyle: 'normal',
      ...props,
    });
    this.view2D = this;

    View2D.shadowRoot.append(this.element);
    this.applyFlex();
  }

  protected override transformContext() {
    // do nothing
  }

  public override dispose() {
    this.removeChildren();
    super.dispose();
  }

  public override render(context: CanvasRenderingContext2D) {
    this.computedSize();
    this.computedPosition();
    super.render(context);
  }

  protected override requestLayoutUpdate() {
    this.updateLayout();
  }

  public override view(): View2D {
    return this;
  }
}
