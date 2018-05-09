import { ColorToolDirective } from './color-tool.directive';
import { Directive, ElementRef, Input, AfterViewInit} from '@angular/core';
 import { Router, ActivatedRoute, ParamMap,NavigationEnd } from '@angular/router';

describe('ColorToolDirective', () => {
  it('should create an instance', () => {
    const directive = new ColorToolDirective(ActivatedRoute,Router,ElementRef);
    expect(directive).toBeTruthy();
  });
});
