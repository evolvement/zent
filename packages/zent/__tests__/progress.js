import React from 'react';
import { mount } from 'enzyme';
import Progress from 'progress';

describe('Progress', () => {
  it('render a default Progress', () => {
    const wrapper = mount(<Progress />);
    expect(wrapper.find('.zent-progress').length).toBe(1);
    expect(wrapper.find('.zent-progress-line').length).toBe(1);
    expect(wrapper.find('.zent-progress-inprogress').length).toBe(1);
    expect(wrapper.find('.zent-progress-wrapper').length).toBe(1);
    expect(wrapper.find('.zent-progress-inner').length).toBe(1);
    expect(wrapper.find('.zent-progress-info').length).toBe(1);
    expect(wrapper.find('.zent-progress-info').text()).toBe('0%');
    expect(
      wrapper.contains(
        <div className="zent-progress-inner" style={{ width: '0%' }} />
      )
    ).toBe(true);
  });

  it('can have custom prefix', () => {
    const wrapper = mount(<Progress prefix="test" />);
    expect(wrapper.find('.test-progress').length).toBe(1);
    expect(wrapper.find('.test-progress-line').length).toBe(1);
    expect(wrapper.find('.test-progress-inprogress').length).toBe(1);
    expect(wrapper.find('.test-progress-wrapper').length).toBe(1);
    expect(wrapper.find('.test-progress-inner').length).toBe(1);
    expect(wrapper.find('.test-progress-info').length).toBe(1);
  });

  it('can have a custom classname', () => {
    const wrapper = mount(<Progress className="test" />);
    expect(wrapper.find('.test').length).toBe(1);
    expect(wrapper.find('.test.zent-progress').length).toBe(1);
  });

  it('can show percent when in progress', () => {
    const wrapper = mount(<Progress percent={70} />);
    expect(wrapper.find('.zent-progress-info').text()).toBe('70%');
    expect(
      wrapper.contains(
        <div className="zent-progress-inner" style={{ width: '70%' }} />
      )
    ).toBe(true);
  });

  it('can show success status when percent is 100', () => {
    const wrapper = mount(<Progress percent={100} />);
    expect(wrapper.find('.zent-progress-inprogress').length).toBe(0);
    expect(wrapper.find('.zent-progress-success').length).toBe(1);
    expect(wrapper.find('.zent-progress-info').text()).toBe('');
    expect(
      wrapper
        .find('.zent-progress-info')
        .contains(<i className="zenticon zenticon-check-circle" />)
    ).toBe(true);
    expect(
      wrapper.contains(
        <div className="zent-progress-inner" style={{ width: '100%' }} />
      )
    ).toBe(true);
  });

  it('can support different status', () => {
    let wrapper = mount(<Progress percent={70} status="success" />);
    expect(wrapper.find('.zent-progress-inprogress').length).toBe(1);
    expect(wrapper.find('.zent-progress-success').length).toBe(0);
    expect(wrapper.find('.zent-progress-info').text()).toBe('70%');
    expect(
      wrapper
        .find('.zent-progress-info')
        .contains(<i className="zenticon zenticon-check-circle" />)
    ).toBe(false);
    expect(
      wrapper.contains(
        <div className="zent-progress-inner" style={{ width: '70%' }} />
      )
    ).toBe(true);

    wrapper = mount(<Progress percent={70} status="exception" />);
    expect(wrapper.find('.zent-progress-exception').length).toBe(1);
    expect(wrapper.find('.zent-progress-info').text()).toBe('');
    expect(
      wrapper
        .find('.zent-progress-info')
        .contains(<i className="zenticon zenticon-close-circle" />)
    ).toBe(true);
    expect(
      wrapper.contains(
        <div className="zent-progress-inner" style={{ width: '70%' }} />
      )
    ).toBe(true);

    wrapper = mount(<Progress percent={100} status="exception" />);
    expect(wrapper.find('.zent-progress-inprogress').length).toBe(0);
    expect(wrapper.find('.zent-progress-success').length).toBe(1);
    expect(wrapper.find('.zent-progress-info').text()).toBe('');
    expect(
      wrapper
        .find('.zent-progress-info')
        .contains(<i className="zenticon zenticon-check-circle" />)
    ).toBe(true);
    expect(
      wrapper.contains(
        <div className="zent-progress-inner" style={{ width: '100%' }} />
      )
    ).toBe(true);

    wrapper = mount(<Progress percent={100} status="success" />);
    expect(wrapper.find('.zent-progress-inprogress').length).toBe(0);
    expect(wrapper.find('.zent-progress-success').length).toBe(1);
    expect(wrapper.find('.zent-progress-info').text()).toBe('');
    expect(
      wrapper
        .find('.zent-progress-info')
        .contains(<i className="zenticon zenticon-check-circle" />)
    ).toBe(true);
    expect(
      wrapper.contains(
        <div className="zent-progress-inner" style={{ width: '100%' }} />
      )
    ).toBe(true);
  });

  it('can hide info', () => {
    let wrapper = mount(<Progress percent={70} showInfo={false} />);
    expect(wrapper.find('.zent-progress-inprogress').length).toBe(1);
    expect(wrapper.find('.zent-progress-info').length).toBe(0);

    wrapper = mount(<Progress percent={100} showInfo={false} />);
    expect(wrapper.find('.zent-progress-success').length).toBe(1);
    expect(wrapper.find('.zent-progress-info').length).toBe(0);
    expect(
      wrapper
        .find('.zent-progress-info')
        .contains(<i className="zenticon zenticon-check-circle" />)
    ).toBe(false);

    wrapper = mount(
      <Progress percent={70} status="exception" showInfo={false} />
    );
    expect(wrapper.find('.zent-progress-exception').length).toBe(1);
    expect(wrapper.find('.zent-progress-info').length).toBe(0);
    expect(
      wrapper
        .find('.zent-progress-info')
        .contains(<i className="zenticon zenticon-close-circle" />)
    ).toBe(false);
  });
});