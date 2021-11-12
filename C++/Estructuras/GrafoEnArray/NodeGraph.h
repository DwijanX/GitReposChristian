#pragma once
#include <iostream>
#include "Lista8.h"
using namespace std;


class NodeGraph
{
private:
    bool Marked;
    int Father;
    Lista8<int> AdjacentList;
public:
    NodeGraph();
    ~NodeGraph();
    int getFather();
    void setFather(int Father);
    bool getMarked();
    void setMarked(bool Marked);
    Lista8<int>& getLista();
    void setNodeGraphToInitialState();
};