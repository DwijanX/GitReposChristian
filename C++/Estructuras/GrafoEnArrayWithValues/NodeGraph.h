#pragma once
#include <iostream>
#include "Lista8.h"
#define MAX_INT 2147483647
using namespace std;


class NodeGraph
{
private:
    bool Marked;
    int Father;
    int Distance;
    Lista8<pair<int,int>> AdjacentList;
public:
    NodeGraph();
    ~NodeGraph();
    int getFather();
    void setFather(int Father);
    bool getMarked();
    void setMarked(bool Marked);
    Lista8<pair<int,int>>& getLista();
    void setNodeGraphToInitialState();
    void setDistance(int Distance);
    void addDistance(int Distance);
    int getDistance();
};