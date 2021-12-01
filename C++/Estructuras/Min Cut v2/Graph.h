#pragma once
#include <map>
#include "Lista8.h"
#include <list>
#include <iostream>
#include <fstream>
#include <set>
#include <algorithm>

using namespace std;

class Graph
{
private:
    map<int,list<int>> graph;
    void Contract(map<int,list<int>>& SubGraph,int v1,int v2);
public:
    Graph();
    ~Graph();
    void LoadFromFile(string FileDirection);
    void AddEdge(int Origin,int Destiny);
    void ShowGraph(void (funcToShowInt)(int*));
    int MinCut(map<int,list<int>> aux);
    int getNumOfNodes();
    map<int,list<int>> getGraph();
};