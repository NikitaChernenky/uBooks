/*
Mykyta Chernenky
200367631
CS 476 - Software Development
uBooks

Visitor Design Pattern - Part 1
*/

import { AdminComponentVisitor } from './admin-component-visitor';

export interface Visitor {
    visit(item: AdminComponentVisitor);
}
