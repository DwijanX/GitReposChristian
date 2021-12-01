#pragma once
#include <iostream>
#include "NodeGraph.cpp"
#include <fstream>
#include <set>
#include <vector>
#include <queue>
using namespace std;


class Graph
{
private:
    int Size;
    NodeGraph* Array;
    set<int> Tree;
    void SetNodesToInitialState();
    void DeepSearchAlg(int Origin,int Destiny,bool* Found);
public:
    Graph(int ArrayLen);
    ~Graph();
    void AddEdge(int OgNode,int DestNode,int Weight);
    void LoadFromFile(string FileDirection);
    bool AmplitudeSearch(int Origin,int Destiny);
    vector<int> AmplitudeSearchWotDestiny(int Origin);
    bool DeepSearch(int Origin,int Destiny);
    vector<int> GetSavedPath(int Destiny);
    void ShowGraph(void (funcToShowFirstOfAnIntPair)(pair<int,int>*));
    void showPathsToOrigin(int Origin);
    void showPathsToOriginWithValues(int Origin);
    void Dijkstra(int Origin);
    void kruskal();

};