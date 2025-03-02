import {usePresenterState, useRendererState, useStorage} from '../../hooks';
import {ButtonSelect, Group, Label} from '../controls';
import {Pane} from '../tabs';
import {useApplication} from '../../contexts';
import {PreviewSettings, RenderingSettings, SharedSettings} from '../settings';
import {Expandable} from '../fields';
import {PresenterState, RendererState} from '@motion-canvas/core';

export function VideoSettings() {
  return (
    <Pane title="Video Settings" id="settings-pane">
      <Expandable title="General" open>
        <SharedSettings />
      </Expandable>
      <Expandable title="Preview">
        <PreviewSettings />
      </Expandable>
      <Expandable title="Rendering">
        <RenderingSettings />
      </Expandable>
      <Group>
        <Label />
        <ProcessButton />
      </Group>
    </Pane>
  );
}

function ProcessButton() {
  const [processId, setProcess] = useStorage('main-action', 0);
  const {renderer, presenter, meta, project} = useApplication();
  const rendererState = useRendererState();
  const presenterState = usePresenterState();

  return (
    <ButtonSelect
      main
      id="render"
      data-rendering={rendererState !== RendererState.Initial}
      value={processId}
      onChange={setProcess}
      onClick={() => {
        if (processId === 0) {
          if (rendererState === RendererState.Initial) {
            renderer.render({
              ...meta.getFullRenderingSettings(),
              name: project.name,
            });
          } else {
            renderer.abort();
          }
        } else if (presenterState === PresenterState.Initial) {
          presenter.present({
            ...meta.getFullRenderingSettings(),
            name: project.name,
            slide: null,
          });
        }
      }}
      options={[
        {value: 0, text: 'RENDER'},
        {value: 1, text: 'PRESENT'},
      ]}
    />
  );
}
