#include "Graph.h"
Graph::Graph()
{
}
Graph::~Graph()
{}
void Graph::AddEdge(int Origin,int Destiny)
{
    graph[Origin].push_back(Destiny);
}
void Graph::ShowGraph(void (funcToShowInt)(int*))
{
    map<int,vector<int>>::iterator it;
    for(it=graph.begin();it!=graph.end();it++)
    {
        cout<<"Adyacencias de "<<it->first<<": ";
        for(int i=0;i<it->second.size();i++)
        {
            cout<<it->second[i]<<" ";
        }
        cout<<"\n";
    }
}
void Graph::LoadFromFile(string FileDirection)
{
    int OgNodeAux,DestNodeAux;
    ifstream File;
    File.open(FileDirection);
    while(File>>OgNodeAux)
    {
        while(File>>DestNodeAux && DestNodeAux!=-1)
        {
            AddEdge(OgNodeAux,DestNodeAux);
        }
    }
    File.close();
}

void Graph::MinCutContraction(map<int,vector<int>>& SubGraph,int v1,int v2)
{
    int Adjacent;
    SubGraph[v1].erase(find( SubGraph[v1].begin(),  SubGraph[v1].end(), v2));
    SubGraph[v2].erase(find( SubGraph[v2].begin(),  SubGraph[v2].end(), v1));

    for(int i=0;i<SubGraph[v2].size();i++)
    {
        Adjacent=SubGraph[v2][i];
        if(Adjacent!=v1)
        {
            SubGraph[v1].push_back(Adjacent);
            SubGraph[Adjacent].push_back(v1);
        }
        SubGraph[Adjacent].erase(find( SubGraph[Adjacent].begin(),  SubGraph[Adjacent].end(), v2));
    }
    SubGraph.erase(v2);
}

int Graph::MinCut(map<int,vector<int>> aux)
{
    map<int,vector<int>>::iterator it;
    int ActualDim=aux.size(),RandomV1,RandomV2;
    while (ActualDim>2)
    {
        it = aux.begin();
        advance(it, rand()%ActualDim);
        RandomV1=it->first;
        RandomV2=aux[RandomV1][rand()%aux[RandomV1].size()];
        MinCutContraction(aux,RandomV1,RandomV2);
        ActualDim=aux.size();
    }
    it=aux.begin();
    return it->second.size();
}
int Graph::getNumOfNodes()
{
    return graph.size();
}
map<int,vector<int>> Graph::getGraph()
{
    return graph;
}


