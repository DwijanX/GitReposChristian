#pragma once
#include <map>
#include <vector>
#include <iostream>
#include <fstream>
#include <algorithm>

using namespace std;

class Graph
{
private:
    map<int,vector<int>> graph;
    vector<int> graphKeys;
    void MinCutContraction(map<int,vector<int>>& SubGraph,int v1,int v2);
public:
    Graph();
    ~Graph();
    void LoadFromFile(string FileDirection);
    void AddEdge(int Origin,int Destiny);
    void ShowGraph(void (funcToShowInt)(int*));
    int MinCut(map<int,vector<int>> aux);
    int getNumOfNodes();
    map<int,vector<int>> getGraph();
};