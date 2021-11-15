#pragma once
#include <iostream>
#include "NodeGraph.cpp"
#include <fstream>
#include <vector>
#include <queue>
using namespace std;


class Graph
{
private:
    int Size;
    NodeGraph* Array;
    void SetNodesToInitialState();
    void DeepSearchAlg(int Origin,int Destiny,bool* Found);

public:
    Graph(int ArrayLen);
    ~Graph();
    void AddEdge(int OgNode,int DestNode);
    void LoadFromFile(string FileDirection);
    bool AmplitudeSearch(int Origin,int Destiny);
    bool DeepSearch(int Origin,int Destiny);
    vector<int> GetSavedPath(int Destiny);
    void ShowGraph(void (funcToShowInt)(int*));
};