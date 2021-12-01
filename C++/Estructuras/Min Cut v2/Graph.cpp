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
    map<int,list<int>>::iterator it;
    for(it=graph.begin();it!=graph.end();it++)
    {
        cout<<"Adyacencias de "<<it->first<<": ";
        list <int> :: iterator it2;
        for(it2 = it->second.begin(); it2 != it->second.end(); ++it2)
            cout << *it2<<" ";
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

void Graph::Contract(map<int,list<int>>& SubGraph,int v1,int v2)
{
    SubGraph[v1].erase(find(SubGraph[v1].begin(),SubGraph[v1].end(),v2));
    SubGraph[v2].erase(find(SubGraph[v2].begin(),SubGraph[v2].end(),v1));
    list<int>::iterator Adjacent;
    for(Adjacent=SubGraph[v2].begin();Adjacent!=SubGraph[v2].end();Adjacent++)
    {
        if(*Adjacent!=v1)
        {
            SubGraph[v1].push_back(*Adjacent);
            SubGraph[*Adjacent].push_back(v1);
        }
        SubGraph[*Adjacent].erase(find(SubGraph[*Adjacent].begin(),SubGraph[*Adjacent].end(),v1));
    }
    SubGraph.erase(v2);
}
int Graph::MinCut(map<int,list<int>> aux)
{
    map<int,list<int>>::iterator it;
    list<int>::iterator it2;
    int RandomV1,RandomV2;
    while (aux.size()>2)
    {
        it = aux.begin();
        std::advance(it, rand()%aux.size());
        RandomV1=it->first;
        it2=aux[RandomV1].begin();
        std::advance(it2, rand()%aux[RandomV1].size());
        RandomV2=*it2;
        Contract(aux,RandomV1,RandomV2);


       
    }
    it=aux.begin();
    return it->second.size();
    return 0;
}
int Graph::getNumOfNodes()
{
    return graph.size();
}
map<int,list<int>> Graph::getGraph()
{
    return graph;
}
